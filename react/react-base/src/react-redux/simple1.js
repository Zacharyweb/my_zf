import React from 'react';
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
            }
            componentDidMount(){
                this.unSubscribe = this.context.store.subscribe(()=>this.setState(
                    mapStateToProps(this.context.store.getState())
                ))
            }
            componentWillUnmount(){
                this.unSubscribe();
            }
            render(){
                let actions = mapDispatchToProps(this.context.store.dispatch);
                return (
                    <Component {...this.props} {...this.state} {...actions}></Component>
                )
            }
        }
    }
}


export {
    Provider,
    connect
}