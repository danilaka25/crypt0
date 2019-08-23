import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { ThemeProvider, Header, ListItem,  Button, Icon  } from 'react-native-elements';


export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isFetching: true,   
      OldDataSource: undefined
    }
  }


 fetchData(){

      function deepEqual (obj1, obj2){ // проверка равенства обектов
         return JSON.stringify(obj1)===JSON.stringify(obj2);
      }

      return fetch('https://api.exmo.com/v1/ticker/')
      .then((response) => response.json())
      .then((responseJson) => {

          var oldObj = responseJson;
          var currencyName;
          var productVersionArray;     
          var newObj =  [];
          //var options =  ["BTC_USD", "ETH_USD", "XRP_USD"];
          var options =  ["BTC_USD"];
          
          var rounded_last_trade;
        

          for (currencyName in oldObj) {

            if ( options.indexOf( currencyName ) != -1 ) { // выборка валют


              productVersionArray = oldObj[currencyName];


                switch(currencyName) {
                  case 'BTC_USD':  
                    rounded_last_trade = parseFloat(productVersionArray.last_trade).toFixed(0);
                    break;
                  case 'ETH_USD': 
                    rounded_last_trade = parseFloat(productVersionArray.last_trade).toFixed(0);
                    break;
                  case 'XRP_USD': 
                    rounded_last_trade = parseFloat(productVersionArray.last_trade).toFixed(6); 
                    break;
                  default:                 
                }

                     

                if ( typeof this.state.OldDataSource !== "undefined") {
                    newObj.push({                 
                      name:  currencyName , 
                      last_trade:  rounded_last_trade,
                      arrow: ''  

                            
                    });
                } else {
                  newObj.push({                 
                    name:  currencyName , 
                    last_trade:  rounded_last_trade,
                    arrow: 'http://www.avocadocafe.com.ua/icon/arrow_blank.png'                 
                  });

                   //console.log("первый круг");
                }




            }    

          }   
 

         // console.log(typeof this.state.OldDataSource);

          if ( typeof this.state.OldDataSource !== "undefined") {
                // console.log("Старый");
                // console.log(this.state.OldDataSource);
                // console.log("Новый");
                // console.log(this.state.dataSource);
                // if ( !deepEqual (this.state.OldDataSource, this.state.dataSource)){
                  

                  //console.log(this.state.OldDataSource);
                  //console.log(this.state.dataSource);
                  //console.log(newObj); 

                  for(i=0;i<1;i++) {
 
                         // console.log(this.state.OldDataSource[i].last_trade);
                         // console.log(this.state.dataSource[i].last_trade);

                         //console.log(typeof parseFloat(this.state.OldDataSource[i].last_trade) );

                         //Math.fround(this.state.OldDataSource[i].last_trade)


                         // if (parseFloat(this.state.OldDataSource[i].last_trade) > parseFloat(this.state.dataSource[i].last_trade)) {
                         //    console.log("хуйня");
                         // }

                         // if (this.state.OldDataSource[i].arrow = "http://www.avocadocafe.com.ua/icon/arrow-down_red.png") {
                         //   console.log("хуйня полная");

                         // }
                        
                        // console.log(this.state.OldDataSource[i].arrow);
                        // console.log(this.state.dataSource[i].arrow);
                                                           
                       if (parseFloat(this.state.OldDataSource[i].last_trade) > parseFloat(this.state.dataSource[i].last_trade)) {
                         
                          //console.log("Замениласб стрелка");
                          newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-down_red.png';

                          console.log(this.state.OldDataSource[i].last_trade);
                          console.log(">");
                          console.log(this.state.dataSource[i].last_trade);

                       } else if(parseFloat(this.state.OldDataSource[i].last_trade) < parseFloat(this.state.dataSource[i].last_trade)) {

                          newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-up_green.png';

                          console.log(this.state.OldDataSource[i].last_trade);
                          console.log("<");
                          console.log(this.state.dataSource[i].last_trade);

                       } else if (parseFloat(this.state.OldDataSource[i].last_trade) == parseFloat(this.state.dataSource[i].last_trade)) {
                         

                         
                            
                          //  if (this.state.OldDataSource[i].arrow == "http://www.avocadocafe.com.ua/icon/arrow-down_red.png") {
                          //      newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-down_red.png';
                          //  } else if (this.state.OldDataSource[i].arrow == "http://www.avocadocafe.com.ua/icon/arrow-up_green.png") {
                          //      newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-up_green.png';
                          //  } 
                          // else {
                          //      newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow_right.png';
                          //  }  


                              switch(this.state.OldDataSource[i].arrow) {
                                case 'http://www.avocadocafe.com.ua/icon/arrow-down_red.png':  
                                  newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-down_red.png';
                                  break;
                                case 'ttp://www.avocadocafe.com.ua/icon/arrow-up_green.png': 
                                  newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow-up_green.png';
                                  break;
                                default:   
                                  newObj[i].arrow = 'http://www.avocadocafe.com.ua/icon/arrow_right.png';           
                             }

                           


                          console.log(this.state.OldDataSource[i].last_trade);
                          console.log("==");
                          console.log(this.state.dataSource[i].last_trade);


                          console.log(this.state.dataSource[i].arrow);
                          console.log(newObj[i].arrow);

                          console.log(newObj[i]);

                        

                       }   

                        //console.log(this.state.OldDataSource[i].arrow);
                        

                          

                        // console.log(this.state.OldDataSource[i].arrow);
                        // console.log(this.state.dataSource[i].arrow);          

                  }
                    



                  console.log("-----------------------");  
                // }
          }  




          this.setState({
            isLoading: false,   
            isFetching: false, 
            dataSource: newObj,
            //OldDataSource: newObj
          });


          })
          .catch((error) =>{
            console.error(error);
          });  

 }

   

  componentDidMount(prevProps, prevState){
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 5000);


    


  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  } 

  componentDidUpdate(prevProps, prevState){

    //console.log(prevState.dataSource);
    //console.log(this.state.dataSource);


     //console.log("-----------------------");


     if ( prevState.dataSource !== this.state.dataSource) { 
        this.setState({
           OldDataSource: prevState.dataSource
        });
     }  

    // if ( typeof prevState.dataSource !== "undefined") {

    //     // console.log(prevState.dataSource[0].last_trade);
    //     // console.log(this.state.dataSource[0].last_trade);

    //     if (prevState.dataSource[0].last_trade < this.state.dataSource[0].last_trade) {
    //        console.log("Стало большеееееееееееееееее");
    //     } else if (prevState.dataSource[0].last_trade > this.state.dataSource[0].last_trade) {
    //        console.log("Стало меньшееееееееееееееееее");
    //     } else {
    //       //console.log("не изменилось");
    //     }

    // }

    


     
  }




 // _keyExtractor = (item, index) => item.iditem.toString();

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(

      // <View style={{flex: 1, paddingTop:20}}>
      //   <FlatList
      //     data={this.state.dataSource}
      //     renderItem={({item}) => <Text> {item.name} , {item.last_trade}</Text>}
      //     keyExtractor={this._keyExtractor}
      //   />
      // </View>
 
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
