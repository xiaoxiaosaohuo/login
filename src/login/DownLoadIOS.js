import  React,{PureComponent} from 'react';

class IOSCode extends PureComponent{
	render(){
		const {title,imgSrc} = this.props;

		return(
			<div className="mobile-code">
				<img id="iosImg" src={imgSrc}/>
				<a className="mobile-btn ios-btn">
					<img src="" ></img>IOS版下载
				</a>
			</div>
		)
	}
}

export default IOSCode;
