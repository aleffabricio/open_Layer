import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_inappbrowser/flutter_inappbrowser.dart';
import 'package:interactive_webview/interactive_webview.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

Future main() async {
  runApp(MyApp());

}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();

}

class _MyAppState extends State<MyApp> {

  InAppWebViewController webView;
  String url = "";
  double progress = 0;
  final _webView = new InteractiveWebView();
  final flutterWebviewPlugin = FlutterWebviewPlugin();

  @override
  void initState() {
    super.initState();

  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
        home: Container(
          child: Scaffold(
            appBar: AppBar(
                title: Text("Univista - Mapa"),
                backgroundColor: Colors.orange,
                actions: <Widget>[
                  IconButton(
                    icon: Icon(Icons.map), alignment: Alignment.topLeft,),
                ]
            ),
            body: Container(
              child: Column(

                children: <Widget>[
                  Expanded(
                    child: Container(
                      child: InAppWebView(
                          initialFile: "assets/index.html",

                      ),

                    ),
                  ),
                ].where((Object o)
                =>
                o != null
                ).toList(),
              ),
            ),
          ),
        ),
    );
  }

}