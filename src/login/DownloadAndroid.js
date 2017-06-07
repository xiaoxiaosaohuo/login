import  React,{PureComponent} from 'react';

class AndroidCode extends PureComponent{
	render(){
		const {title,imgSrc} = this.props;
		return(
			<div className="mobile-code">
				<img id="androidImg" src={imgSrc} ></img>
				<a className="mobile-btn android-btn">
					<img src="" ></img>Android版下载
				</a>
			</div>
		)
	}
}

export default AndroidCode;
