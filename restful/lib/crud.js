const fs = require('fs');
const path = require('path');

class Crud {
  constructor(crudPack, callback) {
    // crudPack params //
    // {file:string, dir:string, data:object, callback:function} //
    // data is optional //

    this.dir = `${path.join(__dirname, '/../.data')}/${crudPack.dir}/${crudPack.file}.json`;
    this.data = crudPack.data || null;
    this.callback = callback;
  }

  // Methods
  create() {
    fs.open(this.dir, 'wx', (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(this.data);
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                this.callback(false);
              } else {
                this.callback('Error closing new file');
              }
            });
          } else {
            this.callback('Error writing to new file');
          }
        });
      } else {
        this.callback('could not create new file, it may already exist');
      }
    });
  }

  read() {
    fs.readFile(this.dir, 'utf8', (err, data) => {
      this.callback(err, data);
    });
  }

  update() {
    fs.open(this.dir, 'a+', (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(this.data);
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                this.callback(false);
              } else {
                this.callback('Error closing new file');
              }
            });
          } else {
            this.callback('Error writing to new file');
          }
        });
      } else {
        this.callback('could not open file, it may not exist');
      }
    });
  }

  delete() {
    fs.unlink(this.dir, (err) => {
      if (!err) {
        this.callback(false);
      } else {
        this.callback('error deleting the file');
      }
    });
  }
}

module.exports = Crud;
