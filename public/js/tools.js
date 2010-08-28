inspector = new Inspector();

inspector.logger = new Logger('console');
inspector.attach(nes.mmap, nes.mmap.regWrite);

inspector.filter = functio(args) {
  // Filter options in here
  return true;
}