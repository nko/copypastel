
joynes.VirtualMemory.prototype = {
  PPU_START  : 0x2000,
  PPU_LENGTH : 0x8,
  Interrupts : 0,
  fPPU  : 0,
  
  PPU_flags : 0,
  last_sync : {},
  
  SET   : function(flags,flag) { 
    return flags | (1 << flag);
  },
  CLEAR : function(flags,flag) { 
    return flags & ~( 1 << flag );
  },
  CHECK : function(flags, flag) {
    return flags & (1 << flag);
  },
  // Reg should be values 0 - 7 for the 8 PPU registers
  ppuRegChange : function(reg) {
    this.Interrupts = this.SET(this.Interrupts, this.fPPU);
    this.PPU_flags  = this.SET(this.PPU_flags, reg);
  },
  
  
  isr : function() {
    if(this.Interrupts & 0xF) {
      var sync_instructions = {}
      // Handle PPU changes (graphics)
      if( this.CHECK(this.Interrupts, this.fPPU) ) {
        this.CLEAR(this.Interrupts, this.fPPU)
        // Loop through all PPU_flags and queue up any state changes
        sync_instructions['ppu'] = {}
        for(var reg = 0; reg < this.PPU_LENGTH; reg++) { 
          if( this.CLEAR(this.PPU_flags, reg) ) { 
            sync_instructions['ppu'][reg] = this.emulator.nes.mmap.regLoad(this.PPU_START & reg ) 
          }
          var different = false
          for(i in this.last_sync ) {
            if( this.last_sync[i] != sync_instructions[i]) {
              different = true;
            }            
          }
          if(different) console.log(sync_instructions)
        }
      }
      
      // All synced changes handled
      this.emulator.socket.postMessage(sync_instructions);
    }
  }
}