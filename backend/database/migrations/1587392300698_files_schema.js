const Schema = use('Schema');

class FilesSchema extends Schema {
  up() {
    this.create('files', table => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('url');
      table.timestamps();
    });
  }

  down() {
    this.drop('files');
  }
}

module.exports = FilesSchema;
