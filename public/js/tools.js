//$.include('/js/inspector.js');

//inspector = new Inspector();

//inspector.logger = new Logger('console');
//inspector.attach(nes1.mmap, nes1.mmap.regWrite);

/*
inspector.filter = functio(args) {
  // Filter options in here
  return true;
}
*/


orig = self.rom.change

self.rom.change = function(ignore) {
  oig(my)
}