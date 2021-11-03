# uploader-node

A simple utility to send files to [uploader](https://github.com/codeday/uploader)

## Usage

```js
const Uploader = require('@codeday/uploader-node');

const upload = Uploader(process.env.UPLOADER_URL, process.env.SECRET);
upload.file(some_file, 'filename.zip');
upload.image(some_other_file); // If filename is not provided, Uploader will try to guess it from the contents.
upload.video(some_video);
```
