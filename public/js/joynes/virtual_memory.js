
joyness.VirtualMemory.prototype = {
  PPU_START  = 0x2000,
  PPU_LENGTH = 0x8,
  FLAGS : 0,
  fPPU  : 0,
  
  PPU_FLAGS : 0,
  
  SET   : function(flag) { flags |= 1 << flag },
  CLEAR : function(flag) { 
    val = flags & (1 << flag);
    flags &=    ~( 1 << flag );
    return val
  },  
  // Reg should be values 0 - 7 for the 8 PPU registers
  ppuRegChange : function(reg) {
    this.SET(fPPU);
    this.
  },
  
  
  isr : function() {
    if(this.FLAGS & 0xF) {
      sync_instructions = {}
      // Handle PPU changes (graphics)
      if(this.CLEAR(fPPU)) {
        // Loop through all PPU_FLAGS and queue up any state changes
        sync_instrutions['ppu'] = {}
        for(var reg = 0; reg < this.PPU_LENGTH; reg++) { 
          if(this.CLEAR(i)) { 
            sync_instructions['ppu'][reg] = this.nes.mmap.regLoad(this.PPU_START & reg ) 
          }
        }
      }
      
      // All synced changes handled
      comm.postMessage(sync_instructions)
    }
  }
  
}