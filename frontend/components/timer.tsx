import React, {Component} from 'react'
import styled from 'styled-components'

const TimerBox = styled.div`
    display: inline-block;
    color: white;
    font-size: 3rem;
    font-weight: bold;
`


interface TimerState {
    time: Date,
    discharge: Date
}

class Timer extends Component<any, TimerState> {
    state = {
        time: new Date(),
        discharge: new Date('December 29, 2020')
    }

    update = () => {
        this.setState({
            time: new Date()
        })
    }

    componentDidMount() {
        setInterval(this.update, 1000)
    }

    render() {
        const timeRemaining = new Date(this.state.discharge.getTime() - this.state.time.getTime())
        const dday = Math.floor(timeRemaining.getTime() / (1000 * 60 * 60 * 24))
        
        const hour = timeRemaining.getUTCHours() % 24
        const minute = timeRemaining.getUTCMinutes() % 60
        const second = timeRemaining.getUTCSeconds() % 60

        const stringHour = ("0" + hour).slice(-2)
        const stringMinute = ("0" + minute).slice(-2);
        const stringSecond = ("0" + second).slice(-2);

        return (
            <TimerBox>
                D-{dday} {stringHour}:{stringMinute}:{stringSecond}
            </TimerBox>
        )
    }
}

export default Timer