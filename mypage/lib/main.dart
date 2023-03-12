import 'package:flutter/material.dart';
import 'widget/button.dart';

void main() {
  runApp(const App());
}

@override
class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color.fromARGB(255, 255, 195, 186),
        body: SingleChildScrollView(
          child: 
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 50,
                ),

                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Welcome, Stranger',
                      style: TextStyle(
                        fontSize: 40,
                        color: Color.fromRGBO(255, 96, 71, 1),
                        fontFamily: 'RubikIso',
                      ),
                    ),

                    const Text(
                        'The archive of CARLSLAM\'s artworks',
                        style: TextStyle(
                            fontFamily: 'RubikIso',
                            color: Color.fromARGB(0, 255, 0, 0),
                        )
                    ),

                    const SizedBox(height: 100,),

                    Column(
                      children: const [
                        Button(
                          text: 'TESTING',
                          bgColor: Color.fromARGB(255, 255, 170, 0),
                          textColor: Colors.white60,
                          fontfamily: 'RubikIso',
                        ),
                        
                        SizedBox(
                          height: 10,
                        ),

                        Button(
                          text: '73s71N9',
                          bgColor: Color.fromARGB(255, 255, 170, 0),
                          textColor: Colors.white60,
                          fontfamily: 'RubikIso',
                        ),
                    ],)
                ],),
            ],),
        ],),
      ),),
    );
  }
}