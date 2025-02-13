"use client";
import React, { Component } from "react";
import eventEmitter from "@/utils/eventEmitter";

interface MatchData {
  matchId: string;
  matchOddsback: number;
  matchOddslay: number;
  matchRuns: string;
  matchOvers: string;
  matchWikets: string;
  matchStatus: string;
  matchBattingTeam: string;
  matchcrr: string;
  aa: string;
  // matchlivedata:any;
}

class MatchWebSocket extends Component<object, MatchData> { // Changed from {} to object
  private socket: WebSocket | null = null;

  constructor(props: object) { // Changed from {} to object
    super(props);
    this.state = {
      matchId: "",
      matchOddsback: 0,
      matchOddslay: 0,   
      matchRuns: "",
      matchOvers: "",
      matchWikets: "", 
      matchStatus: "",
      matchBattingTeam: "",
      matchcrr: "",
      aa: "",
      // matchlivedata:""
    };
  }

  componentDidMount() {
    // Open WebSocket connection
    this.socket = new WebSocket(
      "ws://webhook.entitysport.com:8087/connect?token=7b58d13da34a07b0a047e129874fdbf4"
    );

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data).response;
      if (
        data?.match_id !== undefined &&
        data?.match_id !== "" &&
        data?.live?.live_inning?.batting_team_id !== undefined &&
        data?.live?.live_inning?.batting_team_id !== ""
      ) {
        // console.log("wesocket",JSON.stringify(data));
        this.setState({
          matchId: data?.match_id,
          matchOddsback: data?.live_odds?.matchodds?.teama.back
            ? data.live_odds.matchodds.teama.back
            : 0,
          matchOddslay: data?.live_odds?.matchodds?.teama.lay
            ? data.live_odds.matchodds.teama.lay
            : 0,
          matchBattingTeam: data?.live?.live_inning?.batting_team_id,
          matchRuns: data?.live?.live_score?.runs,
          matchOvers: data?.live?.live_score?.overs,
          matchWikets: data?.live?.live_score?.wickets,
          matchStatus: JSON.stringify(data?.live?.status_note),
          matchcrr: data?.live?.live_score?.runrate,
          // matchlivedata: data,
        });

        eventEmitter.emit("matchLiveData", data);
        // Update div elements based on class
        this.updateDivElements();
      }
    };

    this.socket.onopen = () => console.log("✅ WebSocket Connected");
    this.socket.onclose = () => console.log("❌ WebSocket Disconnected");
  }

  componentWillUnmount() {
    // Close WebSocket when the component unmounts
    if (this.socket) {
      this.socket.close();
    }
  }

  // Function to update all div elements with a specific class
  updateDivElements = () => {
    const elements = document.querySelectorAll(
      `.match${this.state.matchId}-${this.state.matchBattingTeam}`
    ); // Select elements with class `match-info`
    elements.forEach((element) => {
      element.innerHTML = `
              <span className="font-semibold" style="font-weight: 600;">${this.state.matchRuns}/${this.state.matchWikets}</span>
              <span className="text-[#909090] text-[13px]">
                (${this.state.matchOvers})
              </span>
              <Image src="/assets/img/home/bat.png" style="height:13px;" className="h-[13px]" alt="" />
      `;
    });

    // for mobile view
    const melements = document.querySelectorAll(
      `.mmatch${this.state.matchId}-${this.state.matchBattingTeam}`
    ); 
    melements.forEach((element) => {
      element.innerHTML = `
              <span className="font-semibold" style="font-weight: 600;">${this.state.matchRuns}/${this.state.matchWikets} </span>
              <span className="text-[#909090] text-[12px] font-normal">(${this.state.matchOvers})</span>
      `;
    });

    const batImages = document.querySelectorAll(`.mmatchbat${this.state.matchId}-${this.state.matchBattingTeam}`);
    batImages.forEach((el) => el.classList.remove("hidden"));
  

    const statuselements = document.querySelectorAll(
      `.statusNote${this.state.matchId}`
    ); // Select elements with class `match-info`

    statuselements.forEach((element) => {
      element.innerHTML = ` <p>${JSON.parse(this.state.matchStatus)}</p>`;
    });

    const oddbackelements = document.querySelectorAll(
      `.oddback${this.state.matchId}`
    ); // Select elements with class `match-info`

    oddbackelements.forEach((element) => {
      element.innerHTML = ` <p>${this.state.matchOddsback}</p>`;
    });

    const oddlayelements = document.querySelectorAll(
      `.oddlay${this.state.matchId}`
    ); // Select elements with class `match-info`

    oddlayelements.forEach((element) => {
      element.innerHTML = ` <p>${this.state.matchOddslay}</p>`;
    });

    // more info page 
    const matchInfoelements = document.querySelectorAll(
      `.matchinfo${this.state.matchId}-${this.state.matchBattingTeam}`
    ); // Select elements with class `match-info`
    matchInfoelements.forEach((element) => {
      element.innerHTML = `${this.state.matchRuns}/${this.state.matchWikets}
                        <span className="text-[13px] font-medium"  style="font-weight: 500; font-size: 13px">(${this.state.matchOvers})</span>
                      `;
    });

    const crrelements = document.querySelectorAll(
      `.crr${this.state.matchId}`
    ); // Select elements with class `match-info`

    crrelements.forEach((element) => {
      element.innerHTML = ` <p>CRR: ${this.state.matchcrr } ${JSON.parse(this.state.matchStatus)}</p>`;
    });
  };

  render() {
    return <div></div>
  }
}

export default MatchWebSocket;
