'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Vector utility classes
class Vector2D {
    constructor(public x: number, public y: number) {}
    
    static random(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }
}

class Vector3D {
    constructor(public x: number, public y: number, public z: number) {}
    
    static random(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }
}

// Animation controller
class AnimationController {
    private timeline: gsap.core.Timeline
    private time = 0
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private dpr: number
    private size: number
    private stars: Star[] = []
    
    // Constants
    private readonly changeEventTime = 0.32
    private readonly cameraZ = -400
    private readonly cameraTravelDistance = 3400
    private readonly startDotYOffset = 28
    private readonly viewZoom = 100
    private readonly numberOfStars = 5000
    private readonly trailLength = 80
    
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, size: number) {
        this.canvas = canvas
        this.ctx = ctx
        this.dpr = dpr
        this.size = size
        this.timeline = gsap.timeline({ repeat: -1 })
        
        // Initialize
        this.setupRandomGenerator()
        this.createStars()
        this.setupTimeline()
    }
    
    // Setup random generator
    private setupRandomGenerator() {
        const originalRandom = Math.random
        const customRandom = () => {
            let seed = 1234
            return () => {
                seed = (seed * 9301 + 49297) % 233280
                return seed / 233280
            }
        }
        
        Math.random = customRandom()
        this.createStars()
        Math.random = originalRandom
    }
    
    // Create stars
    private createStars() {
        for (let i = 0; i < this.numberOfStars; i++) {
            this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance))
        }
    }
    
    // Setup timeline
    private setupTimeline() {
        this.timeline
            .to(this, {
                time: 1,
                duration: 15,
                repeat: -1,
                ease: "none",
                onUpdate: () => this.render()
            })
    }
    
    // Easing function
    public ease(p: number, g: number): number {
        if (p < 0.5) 
            return 0.5 * Math.pow(2 * p, g)
        else
            return 1 - 0.5 * Math.pow(2 * (1 - p), g)
    }
    
    // Elastic easing
    public easeOutElastic(x: number): number {
        const c4 = (2 * Math.PI) / 4.5
        if (x <= 0) return 0
        if (x >= 1) return 1
        return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
    }
    
    // Map function
    public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }
    
    // Constrain function
    public constrain(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max)
    }
    
    // Linear interpolation
    public lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t
    }
    
    // Spiral path
    public spiralPath(p: number): Vector2D {
        p = this.constrain(1.2 * p, 0, 1)
        p = this.ease(p, 1.8)
        const numberOfSpiralTurns = 6
        const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p)
        const r = 170 * Math.sqrt(p)
        
        return new Vector2D(
            r * Math.cos(theta),
            r * Math.sin(theta) + this.startDotYOffset
        )
    }
    
    // Rotate transformation
    public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
        const middle = new Vector2D(
            (v1.x + v2.x) / 2,
            (v1.y + v2.y) / 2
        )
        
        const dx = v1.x - middle.x
        const dy = v1.y - middle.y
        const angle = Math.atan2(dy, dx)
        const o = orientation ? -1 : 1
        const r = Math.sqrt(dx * dx + dy * dy)
        
        // Elastic effect
        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
        
        return new Vector2D(
            middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
            middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
        )
    }
    
    // Project dot
    public showProjectedDot(position: Vector3D, sizeFactor: number) {
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance
        
        if (position.z > newCameraZ) {
            const dotDepthFromCamera = position.z - newCameraZ
            
            // 3D -> 2D projection formula
            const x = this.viewZoom * position.x / dotDepthFromCamera
            const y = this.viewZoom * position.y / dotDepthFromCamera
            const sw = 400 * sizeFactor / dotDepthFromCamera
            
            this.ctx.lineWidth = sw
            this.ctx.beginPath()
            this.ctx.arc(x, y, 0.5, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }
    
    // Draw start dot
    private drawStartDot() {
        if (this.time > this.changeEventTime) {
            const dy = this.cameraZ * this.startDotYOffset / this.viewZoom
            const position = new Vector3D(0, dy, this.cameraTravelDistance)
            this.showProjectedDot(position, 2.5)
        }
    }
    
    // Main render function
    public render() {
        const ctx = this.ctx
        if (!ctx) return
        
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, this.size, this.size)
        
        ctx.save()
        ctx.translate(this.size / 2, this.size / 2)
        
        // Calculate time parameters
        const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        
        // Rotate camera
        ctx.rotate(-Math.PI * this.ease(t2, 2.7))
        
        // Draw trail
        this.drawTrail(t1)
        
        // Draw stars
        ctx.fillStyle = 'white'
        for (const star of this.stars) {
            star.render(t1, this)
        }
        
        // Draw start dot
        this.drawStartDot()
        
        ctx.restore()
    }
    
    // Draw trail
    private drawTrail(t1: number) {
        for (let i = 0; i < this.trailLength; i++) {
            const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
            
            this.ctx.fillStyle = 'white'
            this.ctx.lineWidth = sw
            
            const pathTime = t1 - 0.00015 * i
            const position = this.spiralPath(pathTime)
            
            // Add rotation effect
            const basePos = position
            const offset = new Vector2D(position.x + 5, position.y + 5)
            const rotated = this.rotate(
                basePos, 
                offset, 
                Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, 
                i % 2 === 0
            )
            
            this.ctx.beginPath()
            this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }
    
    // Pause animation
    public pause() {
        this.timeline.pause()
    }
    
    // Resume animation
    public resume() {
        this.timeline.play()
    }
    
    // Destroy animation
    public destroy() {
        this.timeline.kill()
    }
}

// Star class
class Star {
    private dx: number
    private dy: number
    private spiralLocation: number
    private strokeWeightFactor: number
    private z: number
    private angle: number
    private distance: number
    private rotationDirection: number
    private expansionRate: number
    private finalScale: number
    
    constructor(cameraZ: number, cameraTravelDistance: number) {
        this.angle = Math.random() * Math.PI * 2
        this.distance = 30 * Math.random() + 15
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1
        this.expansionRate = 1.2 + Math.random() * 0.8
        this.finalScale = 0.7 + Math.random() * 0.6
        
        this.dx = this.distance * Math.cos(this.angle)
        this.dy = this.distance * Math.sin(this.angle)
        
        this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
        this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)
        
        const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
        this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation)
        this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
    }
    
    render(p: number, controller: AnimationController) {
        const spiralPos = controller.spiralPath(this.spiralLocation)
        const q = p - this.spiralLocation
        
        if (q > 0) {
            const displacementProgress = controller.constrain(4 * q, 0, 1)
            
            const linearEasing = displacementProgress;
            const elasticEasing = controller.easeOutElastic(displacementProgress);
            const powerEasing = Math.pow(displacementProgress, 2);
            
            let easing;
            if (displacementProgress < 0.3) {
                easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3);
            } else if (displacementProgress < 0.7) {
                const t = (displacementProgress - 0.3) / 0.4;
                easing = controller.lerp(powerEasing, elasticEasing, t);
            } else {
                easing = elasticEasing;
            }
            
            let screenX, screenY;
            
            if (displacementProgress < 0.3) {
                screenX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
                screenY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
            } else if (displacementProgress < 0.7) {
                const midProgress = (displacementProgress - 0.3) / 0.4;
                const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;
                
                const baseX = spiralPos.x + this.dx * 0.3;
                const baseY = spiralPos.y + this.dy * 0.3;
                
                const targetX = spiralPos.x + this.dx * 0.7;
                const targetY = spiralPos.y + this.dy * 0.7;
                
                const perpX = -this.dy * 0.4 * curveStrength;
                const perpY = this.dx * 0.4 * curveStrength;
                
                screenX = controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
                screenY = controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
            } else {
                const finalProgress = (displacementProgress - 0.7) / 0.3;
                
                const baseX = spiralPos.x + this.dx * 0.7;
                const baseY = spiralPos.y + this.dy * 0.7;
                
                const targetDistance = this.distance * this.expansionRate * 1.5;
                const spiralTurns = 1.2 * this.rotationDirection;
                const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;
                
                const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
                const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);
                
                screenX = controller.lerp(baseX, targetX, finalProgress);
                screenY = controller.lerp(baseY, targetY, finalProgress);
            }
            
            const vx = (this.z - controller['cameraZ']) * screenX / controller['viewZoom'];
            const vy = (this.z - controller['cameraZ']) * screenY / controller['viewZoom'];
            
            const position = new Vector3D(vx, vy, this.z);
            
            let sizeMultiplier = 1.0;
            if (displacementProgress < 0.6) {
                sizeMultiplier = 1.0 + displacementProgress * 0.2;
            } else {
                const t = (displacementProgress - 0.6) / 0.4;
                sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
            }
            
            const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;
            
            controller.showProjectedDot(position, dotSize);
        }
    }
}

export function SpiralAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<AnimationController | null>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    // Create and manage animation
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || dimensions.width === 0 || dimensions.height === 0) return
        
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        
        // Handle DPR to solve blur issues
        const dpr = window.devicePixelRatio || 1
        const size = Math.max(dimensions.width, dimensions.height)
        
        canvas.width = size * dpr
        canvas.height = size * dpr
        
        // Set CSS dimensions
        canvas.style.width = `${dimensions.width}px`
        canvas.style.height = `${dimensions.height}px`
        
        // Scale context to match DPR
        ctx.scale(dpr, dpr)
        
        // Create animation controller
        animationRef.current = new AnimationController(canvas, ctx, dpr, size)
        
        return () => {
            // Clean up animation
            if (animationRef.current) {
                animationRef.current.destroy()
                animationRef.current = null
            }
        }
    }, [dimensions])
    
    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    )
}