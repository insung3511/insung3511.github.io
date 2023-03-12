import 'package:flutter/material.dart';


class Button extends StatelessWidget {
  final String text;
  final Color bgColor;
  final Color textColor;
  final String fontfamily;

  const Button({
    super.key,
    required this.text,
    required this.bgColor,
    required this.textColor,
    required this.fontfamily,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: bgColor,
        ),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          vertical: 20,
          horizontal: 40,
        ),
        child: Text(
            text,
            style: TextStyle(
              color: textColor,
              fontSize: 20,
              fontFamily: fontfamily,
            )),
      ),
    );
  }
}