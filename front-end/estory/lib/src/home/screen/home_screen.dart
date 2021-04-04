import 'package:estory/src/home/bloc/home_repository.dart';
import 'package:estory/src/home/models/books_model.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<Book> book;

  @override
  void initState() {
    super.initState();
    book = fetchBook();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('test Home page')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
              )
            ],
          ),
        ));
  }
}
