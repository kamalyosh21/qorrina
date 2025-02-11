function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];
    const confettiCount = 100;

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.speed = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
        }

        update() {
            this.y += this.speed;
            this.rotation += this.speed * 0.1;
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function initConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();
}