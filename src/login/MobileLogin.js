import  React,{PureComponent} from 'react';
class Title extends PureComponent{
	render(){
		const {title} = this.props;
		return(
			<div style={{fontSize: 32,color: '#fff',paddingBottom: 30}}>
				{title}
			</div>
		)
	}
}

export default Title;
