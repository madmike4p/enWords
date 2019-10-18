create table if not exists books (id integer primary key, book text default "");
create table if not exists chapters (id integer primary key, bookId integer, chapter integer, title text);
create table if not exists sentences(id integer primary key, chapterId integer, sentence integer, pl text, en text);