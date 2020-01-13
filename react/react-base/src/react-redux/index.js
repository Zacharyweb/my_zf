import React from 'react';
import {bindActionCreators} from '../redux';
let ReduxContent = React.createContext();
class Provider extends React.Component{
    render(){
        return (
            <ReduxContent.Provider value={{store:this.props.store}}>
                 { this.props.children }
            </ReduxContent.Provider>
            
        )
    }
}
function connect(mapStateToProps,mapDispatchToProps){
    return function(Component){
        return class extends React.Component{
            static contextType = ReduxContent;
            constructor(props,context){
                super(props);
                this.state = mapStateToProps(context.store.getState());

                this.cacheState = mapStateToProps(context.store.getState());
                
                if(typeof mapDispatchToProps == 'function'){
                    this.actions = mapDispatchToProps(context.store.dispatch);
                }else if(typeof mapDispatchToProps == 'object'){
                    this.actions = bindActionCreators(mapDispatchToProps,context.store.dispatch);
                }
                
            }
            componentDidMount(){
                this.unSubscribe = this.context.store.subscribe(()=>{
                    let nextState = mapStateToProps(this.context.store.getState());
                    if(this.cacheState != nextState){
                        this.cacheState = nextState;
                        this.setState(nextState);
                    };
                })
            }
            componentWillUnmount(){
                this.unSubscribe();
            }
            render(){
                
                return (
                    <Component {...this.props} {...this.state} {...this.actions}></Component>
                )
            }
        }
    }
}

export {
    Provider,
    connect
}