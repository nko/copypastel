include "inspector"

inspector = new Inspector();

inspector.logger = new Logger('console');
inspector.attach(nes1.mmap, nes1.mmap.regWrite);

inspector.filter = functio(args) {
  // Filter options in here
  return true;
}