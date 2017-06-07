import  React,{PureComponent} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Banner from './Banner' ;
import Title from './Title';
import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';
import DownLoadAPP from "./DownLoadAPP";
import QRcodeLogin from './QRcodeLogin';
class Login extends PureComponent{
	render(){
		return(
				<div className="login">
					<Banner></Banner>
					<div >
					<Title
					 title="跳房子协同办公系统"
					>
					</Title>

						<div className="card">
							<img id="downloadAPP" src="" alt=""/>
							<Tabs>
							    <TabList style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
							      <Tab style={{marginLeft:30,marginRight:30}}><span style={{fontSize:20}}>扫码登录</span></Tab>
							      <Tab style={{marginLeft:30,marginRight:30}}><span style={{fontSize:20}}>手机登录</span></Tab>
								  <Tab className='tangle'></Tab>
							    </TabList>

							    <TabPanel>
									<QRcodeLogin
									></QRcodeLogin>
							    </TabPanel>
							    <TabPanel>
							      	<LoginForm></LoginForm>
							    </TabPanel>
								<TabPanel>
								<div className="card-body">
									<DownLoadAPP
									></DownLoadAPP>

								</div>
							    </TabPanel>
							  </Tabs>

							<LoginFooter></LoginFooter>
						</div>
					</div>
				</div>
		)
	}
}


export default Login;
