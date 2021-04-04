import 'dart:convert';

import 'package:estory/src/home/models/books_model.dart';
import 'package:http/http.dart' as http;

Future<Book> fetchBook() async {
  try {
    var url = Uri.http('localhost:8080', '/api/book/list', {
      'category': '문학/역사 ',
      'limit': 10,
    });

    var response = await http.get(url);
    if (response.statusCode == 200) {
      return Book.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load books');
    }
  } catch (error) {
    print(error);
  }
}
