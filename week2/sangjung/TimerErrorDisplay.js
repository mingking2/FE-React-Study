import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TimerErrorDisplay.css';

class TimerErrorDisplay extends Component {
    state = {
            error: false
    }

    //자식 태그의 에러 캐치
    componentDidCatch(error, info) {
        this.setState({error:true});
        console.log({error, info});
    }

    render(){

        if (this.state.error){
            return (
                <div className='error-box'>
                    <span> !Timer Error! </span>
                </div>
            );
        }else{
            return this.props.children;
        }

    }
}


TimerErrorDisplay.propTypes = {
    error: PropTypes.bool,
}
TimerErrorDisplay.defaultProps = {
    error: false
}
export default TimerErrorDisplay;