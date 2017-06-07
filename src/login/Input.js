import  React,{PureComponent} from 'react';

class Input extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			value:""
		}
	}
		onChange = (e) =>{
			this.setState({
				value:e.target.value,
			})
			this.props.onChange&&this.props.onChange(e.target.value)
		}
	render(){
		const {isErr,errMsg,placeholder,prefix,className} = this.props;
		const {value} = this.state;
		const wrapperStyle = isErr?'form-item-control has-error':'form-item-control';
		const inputErrStyle = isErr?"form-explain mobile-error-show":"form-explain mobile-error-hide";
		const addonStyle =  isErr?'input-group-addon has-error':'input-group-addon';
		const prefixStyle = !!prefix&&`anticon anticon-${prefix}`;
		return(
			<div className="form-item" style={{marginBottom:0}}>
				<div className={wrapperStyle}>
						<span className="input-wrapper input-group">
							{prefix&&<span className={addonStyle}>
								<i className={prefixStyle}>
								</i>
							</span>}
							<input type="text"
								ref= {this.props.inputRef}
							className="input"
							placeholder={placeholder}
							style={{borderLeft: 0}}
							onChange={this.onChange}
							value={value}
							/>
							<input type="hidden" id="redirectURL" value=""/>
						</span>
					<div className={inputErrStyle} >{errMsg}</div>
				</div>
			</div>
		)

	}
}

export default Input;
