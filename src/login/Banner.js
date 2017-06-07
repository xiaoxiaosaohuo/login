import  React,{PureComponent} from 'react';
import BannerPNG from '../static/banner.png' ;
class Banner extends PureComponent{
	render(){
		return(
			<div className="left">
				<img  id ="" src={BannerPNG} alt=""/>
			</div>
		)
	}
}

export default Banner;
