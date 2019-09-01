import React from 'react';
import {FlatList, ActivityIndicator, Text, View } from 'react-native'; 
import {ThemeProvider, Header, ListItem, Button, Icon } from 'react-native-elements';

export default class FetchExample extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        OldDataSource: undefined
      }
    }

    fetchData() {
      return fetch('https://api.exmo.com/v1/ticker/').then((response) => response.json()).then((responseJson) => {
        var oldObj = responseJson;
        var newObj = [];
        var intermediateObj = [];
        var currencyName;     
        var rounded_last_trade;

        var options =  ["BTC_USD",  "ETH_USD", "XRP_USD"]; 
        var arrowsObj = {
          blank: "http://www.avocadocafe.com.ua/icon/arrow_blank.png",
          right: "http://www.avocadocafe.com.ua/icon/arrow_right.png",
          up:    "http://www.avocadocafe.com.ua/icon/arrow-up_green.png",
          down:  "http://www.avocadocafe.com.ua/icon/arrow-down_red.png", 
        }
        for (currencyName in oldObj) {
          if (options.indexOf(currencyName) != -1) { // filter options
            intermediateObj = oldObj[currencyName];
          
            switch (currencyName) {  // round price
              case 'BTC_USD':
                rounded_last_trade = parseFloat(intermediateObj.last_trade).toFixed(0);
                break;
              case 'ETH_USD':
                rounded_last_trade = parseFloat(intermediateObj.last_trade).toFixed(0);
                break;
              case 'XRP_USD':
                rounded_last_trade = parseFloat(intermediateObj.last_trade).toFixed(6);
                break;
              default:
                rounded_last_trade = parseFloat(intermediateObj.last_trade).toFixed(0);
            }
                     
            newObj.push({
              name: currencyName,
              last_trade: rounded_last_trade,
              arrow: arrowsObj.blank        
            });

          } // endif
        }
        
        if (typeof this.state.OldDataSource !== "undefined") { 

          for (i = 0; i < newObj.length; i++) {
            // show arorows if price has changed
            if (parseFloat(this.state.OldDataSource[i].last_trade) > parseFloat(this.state.dataSource[i].last_trade)) {
              
                newObj[i].arrow = arrowsObj.down;
                //this.state.dataSource[i].arrow = arrowsObj.down;
               
            } else if (parseFloat(this.state.OldDataSource[i].last_trade) < parseFloat(this.state.dataSource[i].last_trade)) {
              
                newObj[i].arrow = arrowsObj.up;
                //this.state.dataSource[i].arrow = arrowsObj.up;
            
            } else  {                  

               if (this.state.OldDataSource[i].arrow == arrowsObj.down) {
                   newObj[i].arrow = arrowsObj.down;
               } else if (this.state.OldDataSource[i].arrow == arrowsObj.up) {
                   newObj[i].arrow = arrowsObj.up;
               } else {
                   newObj[i].arrow = arrowsObj.right;
               }  
              
            }       
          } //end for        
        } //end if undefined

        this.setState({
          isLoading: false,
          dataSource: newObj
        });

      }).then(() => {

      }).catch((error) => {
        console.error(error);
      });
    }

    componentDidMount(prevProps, prevState) {
      this.fetchData();
      this.timer = setInterval(() => this.fetchData(), 5000);
    }

    componentWillUnmount() {
      clearInterval(this.componentWillUnmount);
      this.timer = null;
    } 

    componentDidUpdate(prevProps, prevState) { // get old State
      if (typeof prevState.dataSource !== "undefined") {
        if (prevState.dataSource !== this.state.dataSource) {
           console.log("componentDidUpdate");
          this.setState({
            OldDataSource: prevState.dataSource
          });
        }
      }
    }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return( 
      <ThemeProvider>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Курс крипты', style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
          }}
        />
        <View>
          {
            this.state.dataSource.map((l, i) => (
              <ListItem
                key={i}          
                title={l.name}
                subtitle={l.last_trade}
                rightAvatar={{ source: { uri: l.arrow } }}
              />
            ))
          }
        </View>
      </ThemeProvider> 
    );
  }
}
