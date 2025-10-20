//task3: Play Sounds - Sound Effects Module

class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.5;
        
        // Initialize sounds from MP3 files
        this.initializeSounds();
        
        console.log('🔊 Sound Manager initialized');
    }

    initializeSounds() {
        try {
            // Load custom MP3 files
            this.sounds.click = new Audio('sounds/clickSound.mp3');
            this.sounds.switch = new Audio('sounds/switchSound.mp3');
            this.sounds.success = new Audio('sounds/successSound.mp3');
            
            // Set initial volume for all sounds
            Object.values(this.sounds).forEach(sound => {
                sound.volume = this.volume;
                sound.preload = 'auto'; // Preload for instant playback
            });
            
        } catch (error) {
            console.error('❌ Error loading sound files:', error);
            this.enabled = false;
        }
    }
    
    playClick() {
        if (!this.enabled || !this.sounds.click) return;
        
        try {
            // Clone audio to allow multiple simultaneous plays
            const sound = this.sounds.click.cloneNode();
            sound.volume = this.volume;
            sound.play();
            console.log('🔊 Click sound played');
        } catch (error) {
            console.error('❌ Error playing click sound:', error);
        }
    }
    
    playSuccess() {
        if (!this.enabled || !this.sounds.switch) return;
        
        try {
            // Reset to beginning if already playing
            this.sounds.switch.currentTime = 0;
            this.sounds.switch.volume = this.volume;
            this.sounds.switch.play();
            console.log('🔊 Switch sound played (language change)');
        } catch (error) {
            console.error('❌ Error playing switch sound:', error);
        }
    }
    
    playConfirmation() {
        if (!this.enabled || !this.sounds.success) return;
        
        try {
            this.sounds.success.currentTime = 0;
            this.sounds.success.volume = this.volume;
            this.sounds.success.play();
            console.log('🔊 Success sound played (confirmation page)');
        } catch (error) {
            console.error('❌ Error playing success sound:', error);
        }
    }
    
    playHover() {
        if (!this.enabled || !this.sounds.click) return;
        
        try {
            const sound = this.sounds.click.cloneNode();
            sound.volume = this.volume * 0.3; // Lower volume for hover
            sound.play();
        } catch (error) {
            console.error('❌ Error playing hover sound:', error);
        }
    }
    
    toggleSound() {
        this.enabled = !this.enabled;
        console.log(`🔊 Sound ${this.enabled ? 'enabled' : 'disabled'}`);
        return this.enabled;
    }
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // Update volume for all loaded sounds
        Object.values(this.sounds).forEach(sound => {
            if (sound) sound.volume = this.volume;
        });
        
        console.log(`🔊 Volume set to ${Math.round(this.volume * 100)}%`);
    }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = soundManager;
}
