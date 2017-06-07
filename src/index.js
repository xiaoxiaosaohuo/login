import  React,{Component} from 'react';
import  {render}  from 'react-dom';
import Login from './login';

import "styles/style.css";

class Demo extends Component {

	render(){

		return (
			<Login
				>
			</Login>
		)
	}
}

render(
	<Demo></Demo>,
    document.getElementById('root')
);
