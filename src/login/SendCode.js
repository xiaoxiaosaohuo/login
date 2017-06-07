import  React,{PureComponent} from 'react';

class SendCode extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			value:""
		}
	}
		onChange = (e) =>{
			this.setState({
				value:e.target.value.substring(0,6),
			})
			this.props.onChange&&this.props.onChange(e.target.value.substring(0,6))
		}
		onPressEnter = (e)=>{
			if(e.key==="Enter"){
				this.props.onPressEnter
			}
		}
	render(){
		const {isErr,errMsg,placeholder,handleSendCode,sendDisabled,text} = this.props;
		const {value} = this.state;
		const wrapperStyle = isErr?'form-item-control has-error':'form-item-control';
		const codeErrStyle = isErr?"form-explain code-error-show":"form-explain code-error-hide";
		const addonStyle =  isErr?'input-group-addon has-error':'input-group-addon';
		const disabled = sendDisabled
		return(
			<div className="form-item">
				<div className={wrapperStyle}>
					<div className="row-flex row-flex-space-between ">
						<div className="flexitem">
								<span className="input-wrapper input-group">
									<input
									type="text"
									className="input code"
									 placeholder={placeholder}
									 onChange={this.onChange}
									value={value}
									onKeyPress = {this.onPressEnter}
									 />
								</span>
							<div className={codeErrStyle} >{errMsg}</div>
						</div>
						<div className="flexitem flexitem-right">
								<span className="input-wrapper input-group">
									<button type="button" className=" code btn" disabled={disabled} onClick={handleSendCode}>{text}</button>
								</span>
						</div>

					</div>
				</div>
			</div>
		)

	}
}

export default SendCode;
