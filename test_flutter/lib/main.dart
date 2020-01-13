import 'package:flutter/material.dart';

void main() => runApp(MyApp());


class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext content){
      return MaterialApp(
        title: 'Hello Zachary',
        theme: ThemeData(
          primarySwatch: Colors.red
        ),
        home: MyHome(title:'new App'),
      );

    }
}


class MyHome extends StatefulWidget {
  MyHome({Key key,@required this.title}):super(key:key);
  final String title;
  @override
  _MyHomeState createStore() => _MyHomeState();
}

class _MyHomeState extends State<MyHome> {
  int counter = 0;
  void _increse(){
    setState(() {
      counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Please click button to add'),
            Text('$counter'),
          ],
        ),
      ),
      floatingActionButton:FloatingActionButton(
        onPressed: _increse,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ) ,
    );
  }
}

