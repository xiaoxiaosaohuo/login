import  React,{PureComponent} from 'react';
import Input from './Input';
import SendCode from './SendCode';
import {fetchData,fetchDataWithToken,getQueryString} from "./func";
class Validator  {
	constructor() {
    this.errMsg = "";
    this.mobilePattern  = /(^(13\d|15[^4,\D]|14[7]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/g;
	this.codePattern = /^\d{6}$/g;
  }
	validateMobile =  (value)=> {
		return this.mobilePattern.test(value)
	}
	validateCode = (value) =>{
		return this.codePattern.test(value)
	}
}



class LoginForm extends PureComponent{
	constructor(props){
		super(props);
		this.state={

			codeValue:"",
			isCodeErr:false,
			ismobileErr:false,
			mobileErrMsg:"",
			codeErrMsg:"",
			notPass:false,
			text:"发送动态密码",
			sendDisabled:false
		}
		this.MobileValue = "";
		this.codeValue = "";
	}
	onMobileChange = (value) =>{
		if(value.length>="11"){
			const check = new Validator
			const isTrue = check.validateMobile(value)
				this.setState({
					ismobileErr:!isTrue,
					mobileErrMsg:isTrue?"":"请输入正确手机号！",
					sendDisabled:!isTrue
				})
			this.MobileValue = isTrue?value:""
		}
	}
	onCodeChange = (value) =>{

		if(value.length=="6"){
			//此时验证就是看是不是数字
			const check = new Validator
			const isTrue = check.validateCode(value)
			this.setState({
				isCodeErr:!isTrue,
				codeErrMsg:isTrue?"":"请输入6位数字！"
			})
			this.codeValue = isTrue?value:"";

		}
	}
	handleSendCode = () =>{
		let time = 60;
		if(!!this.MobileValue){
			this.setState({
				text:"重新发送("+time+")",
				sendDisabled:true
			})
			const timer = setInterval(()=>{
				time --;
				this.setState({
					text:"重新发送("+time+")",

				})
				if(time==0){
						clearInterval(timer);
					this.setState({
						text:"发送动态密码",
						sendDisabled:false
					})

				}
			},1000)
			const url = `/sendDynamicCode?phoneNumber=${this.MobileValue}`

			fetchData(url)
			.then((data)=>{
				if (data) {
				  if(data.code == "0011111100000004"){
					 this.setState({
						 notPass:true,
						 passText:'验证码下发失败',
                         text:"发送动态密码",
						 sendDisabled:false
					 })
                     clearInterval(timer);
				   }else if(data.code == "0011111100000005"){
					   this.setState({
						notPass:true,
						passText:'手机号不存在',
                        text:"发送动态密码",
						sendDisabled:false
					})
                    clearInterval(timer);

                }else if(data.code == "0011711100000003"){
                    this.setState({
                     notPass:true,
                     passText:data.msg,
                     text:"发送动态密码",
                     sendDisabled:false
                 })
                 clearInterval(timer);
             }else if(data.code=="0011111100000000"){
				 this.setState({
				  notPass:true,
				  passText:'内部错误',
				  text:"发送动态密码",
				  sendDisabled:false
				  })
			  clearInterval(timer);
			 }else if(data.success=="true"){
                        this.setState({
                         notPass:false,
                         sendDisabled:true
                     })
				   }
				   //验证码发送成功
				}
			})

		}else{
			this.setState({
				ismobileErr:!this.MobileValue,
				mobileErrMsg:"请输入手机号！"
			})
		}

	}
	handleLogin = (e) =>{
		e.preventDefault()
		if(!this.codeValue){

			this.setState({
				isCodeErr:!this.codeValue,
				codeErrMsg:"请输入6位有效数字！",
			})

		}
		if(!this.MobileValue){

			this.setState({
				ismobileErr:!this.MobileValue,
				mobileErrMsg:"请输入手机号！"
			})

		}
        if(!this.MobileValue||!this.codeValue){
            return false
        }

		//获取跳转的url

		const redirectURL =getQueryString();
		const url = `/loginAjaxDynamicCode?phoneNumber=${this.MobileValue}&dynamicCode=${this.codeValue}&redirectURL=${redirectURL}`
		fetchDataWithToken(url)
		.then((data)=>{
			if (data.code == "0011111100000002") {
				this.setState({
					notPass:true,
					passText:'用户验证失败',
				})
			}else if(data.code =="0011111100000000"){
				this.setState({
   				 notPass:true,
   				 passText:'内部错误',
   			 })
		 } else if(data.code==="000"||data.success==true) {
			window.location.replace(data.data.redirectUrl);

			}
		})

	}
	componentDidMount(){

	    this.myInput.focus();
	  }
	render(){
		const {ismobileErr,mobileErrMsg,isCodeErr,codeErrMsg,notPass,text,sendDisabled,passText}=this.state;

		const passStyle = notPass?"pass-error-show":"pass-error-hide";
		const disabled = isCodeErr||ismobileErr||notPass
		return (
			<div id="login-section" >
				<div className="card-body">
					<div className={passStyle}>{passText}</div>
					<form action="" className="">
					<Input
					placeholder="手机号"
					inputRef={(input) => { this.myInput = input; }}
					isErr = {ismobileErr}
					errMsg = {mobileErrMsg}
					onChange={this.onMobileChange}
					prefix="mobile"
					className="input"
					>

					</Input>
					<SendCode
						placeholder="动态密码"
					   isErr = {isCodeErr}
					   errMsg = {codeErrMsg}
					   onChange={this.onCodeChange}
					   handleSendCode = {this.handleSendCode}
					   sendDisabled={sendDisabled}
					   text={text}
					   onPressEnter = {this.handleLogin}
					>

					</SendCode>

						<div className="form-item">
							<div className="form-item-control">
								<button type="submit" className="btn btn-primary " id="loginBtn" onClick = {this.handleLogin} disabled={disabled}>
									<span>登 录</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default LoginForm;
