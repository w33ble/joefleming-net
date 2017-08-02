const markdown = require('markdown-it');
const { basename, dirname, extname } = require('path');

const isMarkdown = (filename) => /\.md|\.markdown/.test(extname(filename));

module.exports = b => b.use((files, metalsmith, done) => {
  const md = markdown({
    html: true,
  });

  // code borrowed heavily from metalsmith-markdown
  Object.keys(files).forEach((file) => {
    // skip files based on extension
    if (!isMarkdown(file)) return;

    const data = files[file];
    const dir = dirname(file);
    const target = basename(file, extname(file)) + '.html';
    const targetPath = ('.' !== dir) ? `${dir}/${target}` : target;

    const html = md.render(data.contents.toString());
    data.contents = new Buffer(html);

    files[targetPath] = data;
    delete files[file];
  });

  done();
});
