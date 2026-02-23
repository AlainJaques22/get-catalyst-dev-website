import { useEffect, useRef } from 'react';

// ── Types ──

interface BpmnNode {
  id: number;
  type: 'start' | 'end' | 'task' | 'gateway';
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Point {
  x: number;
  y: number;
}

interface BpmnEdge {
  from: number;
  to: number;
  pts: Point[];
}

interface Colors {
  nodeFill: string;
  nodeStroke: string;
  flow: string;
  arrow: string;
  token: string;
  tokenGlow: string;
  grid: string;
}

// ── Config (scaled up ~1.5x from Studio for hero context) ──

const CFG = {
  nodeCount: 28,
  nodeCountMobile: 16,
  tokenCount: 8,
  gridStep: 64,
  minDist: 80,
  maxDist: 360,
  speedMult: 0.5,
};

const TYPEBAG: BpmnNode['type'][] = [
  'start', 'task', 'task', 'task', 'task',
  'gateway', 'task', 'task', 'task', 'end',
];

// ── Hardcoded colors (fixed dark theme, no CSS variable reading) ──

const COLORS: Colors = {
  nodeFill: 'rgba(255,255,255,0.04)',
  nodeStroke: 'rgba(255,255,255,0.14)',
  flow: 'rgba(255,255,255,0.07)',
  arrow: 'rgba(255,255,255,0.12)',
  token: 'rgba(34,211,238,0.9)',
  tokenGlow: 'rgba(34,211,238,0.15)',
  grid: 'rgba(255,255,255,0.014)',
};

// ── Node geometry — boundary point toward a target (scaled up) ──

function nodeEdgePoint(node: BpmnNode, toward: Point): Point {
  const dx = toward.x - node.x;
  const dy = toward.y - node.y;

  if (node.type === 'start' || node.type === 'end') {
    const r = 10;
    const len = Math.hypot(dx, dy) || 1;
    return { x: node.x + (dx / len) * r, y: node.y + (dy / len) * r };
  }

  if (node.type === 'task') {
    const hw = 24, hh = 15;
    const tx = dx === 0 ? Infinity : hw / Math.abs(dx);
    const ty = dy === 0 ? Infinity : hh / Math.abs(dy);
    const t = Math.min(tx, ty);
    return { x: node.x + dx * t, y: node.y + dy * t };
  }

  if (node.type === 'gateway') {
    const r = 13;
    const len = Math.hypot(dx, dy) || 1;
    const nx = dx / len, ny = dy / len;
    const t = r / (Math.abs(nx) + Math.abs(ny));
    return { x: node.x + nx * t, y: node.y + ny * t };
  }

  return { x: node.x, y: node.y };
}

// ── Orthogonal route between two boundary points ──

function orthoRoute(src: BpmnNode, dst: BpmnNode, srcPt: Point, dstPt: Point): Point[] {
  const x1 = srcPt.x, y1 = srcPt.y;
  const x2 = dstPt.x, y2 = dstPt.y;
  const dx = dst.x - src.x;
  const dy = dst.y - src.y;

  let pts: Point[];

  if (Math.abs(dx) >= Math.abs(dy)) {
    const midX = (x1 + x2) / 2;
    pts = [
      { x: x1, y: y1 },
      { x: midX, y: y1 },
      { x: midX, y: y2 },
      { x: x2, y: y2 },
    ];
  } else {
    const midY = (y1 + y2) / 2;
    pts = [
      { x: x1, y: y1 },
      { x: x1, y: midY },
      { x: x2, y: midY },
      { x: x2, y: y2 },
    ];
  }

  return pts.filter((p, i) => {
    if (i === 0) return true;
    return Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) > 0.5;
  });
}

// ── Collision radius per node type (scaled up) ──

function nodeCollisionRadius(n: BpmnNode): number {
  if (n.type === 'start' || n.type === 'end') return 10;
  if (n.type === 'gateway') return 13;
  return 26;
}

// ── Draw node (scaled up) ──

function drawNode(ctx: CanvasRenderingContext2D, n: BpmnNode, alpha: number, col: Colors) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = col.nodeFill;
  ctx.strokeStyle = col.nodeStroke;

  if (n.type === 'start') {
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (n.type === 'end') {
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (n.type === 'task') {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(n.x - 24, n.y - 15, 48, 30, 4);
    ctx.fill();
    ctx.stroke();
  } else if (n.type === 'gateway') {
    const r = 13;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(n.x, n.y - r);
    ctx.lineTo(n.x + r, n.y);
    ctx.lineTo(n.x, n.y + r);
    ctx.lineTo(n.x - r, n.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

// ── Draw orthogonal edge with arrowhead ──

function drawEdge(ctx: CanvasRenderingContext2D, e: BpmnEdge, alpha: number, col: Colors) {
  const pts = e.pts;
  if (!pts || pts.length < 2) return;

  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.strokeStyle = col.flow;
  ctx.lineWidth = 0.8;
  ctx.setLineDash([]);
  ctx.stroke();

  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const ang = Math.atan2(last.y - prev.y, last.x - prev.x);
  const al = 8;

  ctx.globalAlpha = alpha * 0.85;
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(last.x - al * Math.cos(ang - 0.38), last.y - al * Math.sin(ang - 0.38));
  ctx.lineTo(last.x - al * Math.cos(ang + 0.38), last.y - al * Math.sin(ang + 0.38));
  ctx.closePath();
  ctx.fillStyle = col.arrow;
  ctx.fill();

  ctx.globalAlpha = 1;
}

// ── Polyline helpers ──

function polyLen(pts: Point[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++)
    l += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return l;
}

function polyPt(pts: Point[], d: number): Point {
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (acc + seg >= d) {
      const t = (d - acc) / seg;
      return {
        x: pts[i - 1].x + t * (pts[i].x - pts[i - 1].x),
        y: pts[i - 1].y + t * (pts[i].y - pts[i - 1].y),
      };
    }
    acc += seg;
  }
  return pts[pts.length - 1];
}

// ── Grid ──

function drawGrid(ctx: CanvasRenderingContext2D, W: number, H: number, col: Colors) {
  ctx.strokeStyle = col.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= W; x += CFG.gridStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
  }
  for (let y = 0; y <= H; y += CFG.gridStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
  }
  ctx.stroke();
}

// ── Mini coffee cup ──

function drawCoffeeCup(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, col: string) {
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const bw = s * 0.85;
  const bw2 = s * 0.65;
  const bh = s * 1.2;
  const by = cy;

  ctx.lineWidth = s * 0.22;
  ctx.beginPath();
  ctx.moveTo(cx - bw, by - bh * 0.5);
  ctx.lineTo(cx + bw, by - bh * 0.5);
  ctx.lineTo(cx + bw2, by + bh * 0.5);
  ctx.lineTo(cx - bw2, by + bh * 0.5);
  ctx.closePath();
  ctx.globalAlpha *= 0.12;
  ctx.fill();
  ctx.globalAlpha /= 0.12;
  ctx.stroke();

  // Handle
  ctx.lineWidth = s * 0.2;
  ctx.beginPath();
  ctx.arc(cx + bw * 0.92, by, s * 0.38, -Math.PI * 0.42, Math.PI * 0.42);
  ctx.stroke();

  // Steam
  const steamY = by - bh * 0.5 - s * 0.2;
  ctx.lineWidth = s * 0.18;
  ctx.globalAlpha *= 0.35;
  ctx.beginPath();
  ctx.moveTo(cx, steamY);
  ctx.bezierCurveTo(
    cx - s * 0.3, steamY - s * 0.4,
    cx + s * 0.3, steamY - s * 0.8,
    cx, steamY - s * 1.1,
  );
  ctx.stroke();
  ctx.globalAlpha /= 0.35;

  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
}

// ── Token class ──

class Token {
  edge: BpmnEdge;
  t: number;
  speed: number;
  alpha: number;

  constructor(edge: BpmnEdge) {
    this.edge = edge;
    this.t = 0;
    this.speed = 0.00045 + Math.random() * 0.00055;
    this.alpha = 0.45 + Math.random() * 0.3;
  }

  attach(edge: BpmnEdge) {
    this.edge = edge;
    this.t = 0;
    this.speed = 0.00045 + Math.random() * 0.00055;
    this.alpha = 0.45 + Math.random() * 0.3;
  }

  update(dt: number, edges: BpmnEdge[], edgesFrom: (id: number) => BpmnEdge[]) {
    this.t += this.speed * dt * CFG.speedMult;
    if (this.t >= 1) {
      const next = edgesFrom(this.edge.to);
      if (next.length) {
        this.attach(next[Math.floor(Math.random() * next.length)]);
      } else {
        this.attach(edges[Math.floor(Math.random() * edges.length)]);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, col: Colors) {
    const pts = this.edge.pts;
    if (!pts || pts.length < 2) return;
    const len = polyLen(pts);
    if (len < 1) return;
    const pos = polyPt(pts, this.t * len);

    // Soft glow
    ctx.globalAlpha = this.alpha * 0.22;
    const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 10);
    g.addColorStop(0, col.tokenGlow);
    g.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // Mini coffee cup
    ctx.globalAlpha = this.alpha * 0.72;
    drawCoffeeCup(ctx, pos.x, pos.y, 3.5, col.token);

    ctx.globalAlpha = 1;
  }
}

// ── Component ──

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const _c = canvasRef.current;
    if (!_c) return;
    const _ctx = _c.getContext('2d');
    if (!_ctx) return;
    const canvas = _c;
    const ctx = _ctx;

    let W = 0, H = 0;
    let animId = 0;
    let lastTs = 0;

    const mouse = { x: -9999, y: -9999, radius: 150, strength: 2.8 };
    const col = COLORS;

    let nodes: BpmnNode[] = [];
    let edges: BpmnEdge[] = [];
    let tokens: Token[] = [];

    function getNodeCount() {
      return window.innerWidth < 640 ? CFG.nodeCountMobile : CFG.nodeCount;
    }

    // ── Build world ──

    function edgesFrom(id: number): BpmnEdge[] {
      return edges.filter(e => e.from === id);
    }

    function rebuildEdges() {
      edges = [];
      nodes.forEach(src => {
        const cands = nodes
          .filter(n => n.id !== src.id)
          .map(n => ({ node: n, dist: Math.hypot(n.x - src.x, n.y - src.y) }))
          .filter(s => s.dist > CFG.minDist && s.dist < CFG.maxDist)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 4);

        const count = 1 + (Math.random() < 0.35 ? 1 : 0);
        for (let i = 0; i < Math.min(count, cands.length); i++) {
          const to = cands[i].node;
          const dup = edges.find(e =>
            (e.from === src.id && e.to === to.id) ||
            (e.from === to.id && e.to === src.id),
          );
          if (!dup) {
            const srcPt = nodeEdgePoint(src, to);
            const dstPt = nodeEdgePoint(to, src);
            edges.push({ from: src.id, to: to.id, pts: orthoRoute(src, to, srcPt, dstPt) });
          }
        }
      });
    }

    function updateEdgePts() {
      edges.forEach(e => {
        const s = nodes[e.from];
        const d = nodes[e.to];
        if (!s || !d) return;
        const srcPt = nodeEdgePoint(s, d);
        const dstPt = nodeEdgePoint(d, s);
        e.pts = orthoRoute(s, d, srcPt, dstPt);
      });
    }

    function buildWorld() {
      nodes = [];
      edges = [];
      tokens = [];

      const nodeCount = getNodeCount();
      const cols = Math.max(1, Math.round(Math.sqrt(nodeCount * W / H)));
      const rows = Math.max(1, Math.ceil(nodeCount / cols));
      const cw = W / cols, ch = H / rows;
      let idx = 0;

      for (let r = 0; r < rows && idx < nodeCount; r++) {
        for (let c = 0; c < cols && idx < nodeCount; c++) {
          nodes.push({
            id: idx++,
            type: TYPEBAG[Math.floor(Math.random() * TYPEBAG.length)],
            x: cw * c + cw * (0.15 + Math.random() * 0.7),
            y: ch * r + ch * (0.15 + Math.random() * 0.7),
            vx: (Math.random() - 0.5) * 0.055,
            vy: (Math.random() - 0.5) * 0.055,
          });
          idx = nodes.length;
        }
      }

      rebuildEdges();

      for (let i = 0; i < CFG.tokenCount; i++) {
        if (edges.length) {
          const e = edges[Math.floor(Math.random() * edges.length)];
          const tok = new Token(e);
          tok.t = Math.random();
          tokens.push(tok);
        }
      }
    }

    // ── Update ──

    function updateWorld(dt: number) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minD = nodeCollisionRadius(a) + nodeCollisionRadius(b) + 8;
          if (dist < minD && dist > 0.1) {
            const overlap = (minD - dist) / dist;
            const fx = dx * overlap * 0.5;
            const fy = dy * overlap * 0.5;
            a.vx -= fx * 0.3;
            a.vy -= fy * 0.3;
            b.vx += fx * 0.3;
            b.vy += fy * 0.3;
          }
        }
      }

      nodes.forEach(n => {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouse.radius && mdist > 0.1) {
          const force = (1 - mdist / mouse.radius) * mouse.strength;
          n.vx += (mdx / mdist) * force * 0.12;
          n.vy += (mdy / mdist) * force * 0.12;
        }

        n.x += n.vx * dt * CFG.speedMult;
        n.y += n.vy * dt * CFG.speedMult;

        if (n.x < 40) n.vx += 0.01;
        if (n.x > W - 40) n.vx -= 0.01;
        if (n.y < 40) n.vy += 0.01;
        if (n.y > H - 60) n.vy -= 0.01;

        n.vx *= 0.992;
        n.vy *= 0.992;
        n.vx += (Math.random() - 0.5) * 0.0018;
        n.vy += (Math.random() - 0.5) * 0.0018;
      });

      updateEdgePts();
      tokens.forEach(t => t.update(dt, edges, edgesFrom));
    }

    // ── Draw ──

    function drawWorld() {
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, W, H, col);
      edges.forEach(e => drawEdge(ctx, e, 0.78, col));
      nodes.forEach(n => drawNode(ctx, n, 0.75, col));
      tokens.forEach(t => t.draw(ctx, col));
    }

    // ── Resize ──

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const newW = Math.round(rect.width);
      const newH = Math.round(rect.height);
      if (newW < 1 || newH < 1) return;
      if (newW === W && newH === H) return;
      W = newW;
      H = newH;
      canvas.width = W;
      canvas.height = H;
      buildWorld();
    }

    // ── Animation loop ──

    function loop(ts: number) {
      const dt = Math.min((ts - lastTs) / 16.67, 4);
      lastTs = ts;
      updateWorld(dt);
      drawWorld();
      animId = requestAnimationFrame(loop);
    }

    // ── Mouse tracking ──

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // ── Init ──

    resize();
    animId = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
