
joyness.VirtualMemory.prototype = {
  PPU_START  = 0x2000,
  PPU_LENGTH = 0x8,
  Interrupts : 0,
  fPPU  : 0,
  
  PPU_flags : 0,
  
  SET   : function(flags,flag) { flags |= 1 << flag },
  CLEAR : function(flags,flag) { 
    val = flags & (1 << flag);
    flags &=    ~( 1 << flag );
    return val
  },  
  // Reg should be values 0 - 7 for the 8 PPU registers
  ppuRegChange : function(reg) {
    this.SET(this.INTERRUPTS, this.fPPU);
    this.SET(this.PPU_flags, reg)
  },
  
  
  isr : function() {
    if(this.INTERRUPTS & 0xF) {
      sync_instructions = {}
      // Handle PPU changes (graphics)
      if( this.CLEAR(this.INTERRUPTS, this.fPPU) ) {
        // Loop through all PPU_flags and queue up any state changes
        sync_instrutions['ppu'] = {}
        for(var reg = 0; reg < this.PPU_LENGTH; reg++) { 
          if( this.CLEAR(this.PPU_flags, reg) ) { 
            sync_instructions['ppu'][reg] = this.nes.mmap.regLoad(this.PPU_START & reg ) 
          }
        }
      }
      
      // All synced changes handled
      this.emulator.socket.postMessage(sync_instructions)
    }
  }
  
}