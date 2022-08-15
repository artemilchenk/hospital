const config = {
  mongodb: {
    url: 'mongodb+srv://artem:03mern09@cluster0.vlsfh8k.mongodb.net/?retryWrites=true&w=majority',
    databaseName: "test",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
