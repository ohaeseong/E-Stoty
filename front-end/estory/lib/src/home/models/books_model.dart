class Book {
  final String id;
  final String title;
  final String contents;
  final String memberId;
  final String state;
  final String thumbnailAddress;
  final String introduce;
  final String writer;
  final int price;
  final String company;
  final String category;
  final String email;
  final String phone;
  final String createTime;

  Book(
      {this.id,
      this.title,
      this.contents,
      this.memberId,
      this.state,
      this.thumbnailAddress,
      this.introduce,
      this.writer,
      this.price,
      this.company,
      this.category,
      this.email,
      this.phone,
      this.createTime});

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      id: json['id'],
      title: json['title'],
      contents: json['contents'],
      memberId: json['member_id'],
      state: json['state'],
      thumbnailAddress: json['thumbnail_address'],
      introduce: json['introduce'],
      writer: json['writer'],
      price: json['price'],
      company: json['company'],
      category: json['category'],
      email: json['email'],
      phone: json['phone'],
      createTime: json['create_time'],
    );
  }
}
