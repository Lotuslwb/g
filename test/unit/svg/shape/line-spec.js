/**
 * Created by Elaine on 2018/5/4.
 */
const expect = require('chai').expect;
const g = require('../../../../src/index');

const G = g.svg;
const Canvas = G.Canvas;

const div = document.createElement('div');
div.id = 'canvas-line';
document.body.appendChild(div);

describe('Line', () => {

  const canvas = new Canvas({
    containerId: 'canvas-line',
    width: 200,
    height: 200,
    pixelRatio: 1
  });
  const line = new G.Line({
    attrs: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    }
  });
  canvas.add(line);
  it('init attrs', () => {
    expect(line.attr('x1')).to.equal(0);
    expect(line.attr('y1')).to.equal(0);
    expect(line.attr('x2')).to.equal(0);
    expect(line.attr('y2')).to.equal(0);
    expect(line.attr('lineWidth')).to.equal(1);
    expect(line.attr('stroke')).to.equal('#000');
    expect(line.attr('fill')).to.be.undefined;
    expect(line.attr('startArrow')).to.be.false;
    expect(line.attr('endArrow')).to.be.false;
    const box = line.getBBox();
    expect(box.minX).to.equal(0);
    expect(box.maxX).to.equal(0);
    expect(box.minY).to.equal(0);
    expect(box.maxY).to.equal(0);
  });

  it('x1', () => {
    line.attr('x1', 10);
    expect(line.attr('x1')).to.equal(10);
    const box = line.getBBox();
    expect(box.minX).to.equal(0);
    expect(box.maxX).to.equal(10);
  });

  it('y1', () => {
    line.attr('y1', 15);
    expect(line.attr('y1')).to.equal(15);
    const box = line.getBBox();
    expect(box.minY).to.equal(0);
    expect(box.maxY).to.equal(15);
  });

  it('x2', () => {
    line.attr('x2', 59);
    expect(line.attr('x2')).to.equal(59);
    const box = line.getBBox();
    expect(box.minX).to.equal(10);
    expect(box.maxX).to.equal(59);
  });

  it('y2', () => {
    line.attr('y2', 80);
    expect(line.attr('y2')).to.equal(80);
    const box = line.getBBox();
    expect(box.minY).to.equal(15);
    expect(box.maxY).to.equal(80);
  });

  it('lineWidth', () => {
    expect(line.attr('lineWidth')).to.equal(1);
    line.attr('lineWidth', 2);
    expect(line.attr('lineWidth')).to.equal(2);
    const box = line.getBBox();
    expect(box.minX).to.equal(10);
    expect(box.maxX).to.equal(59);
    expect(box.minY).to.equal(15);
    expect(box.maxY).to.equal(80);
  });

  it('stroke', () => {
    line.attr('stroke', 'l (0) 0.1:#0fedae 1:#6542da');
    expect(line.attr('stroke')).to.equal('l (0) 0.1:#0fedae 1:#6542da');
    canvas.add(line);
    canvas.draw();
  });

  it('stroke', () => {
    const line1 = new G.Line({
      attrs: {
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
        fill: '#000'
      }
    });
    line1.attr('stroke', 'red');
    expect(line1.attr('stroke')).to.equal('red');
    expect(line1.attr('fill')).to.equal('#000');
  });

  it('arrow', () => {
    line.attr({
      startArrow: true,
      endArrow: true
    });
    expect(line.attr('startArrow')).to.be.true;
    line.attr('stroke', '#f00');
    canvas.draw();
  });

  it('getPoint', () => {
    const line = new G.Line({
      attrs: {
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 300,
        startArrow: new G.Marker({
          attrs: {
            x: 20,
            y: 20,
            radius: 10,
            symbol: 'circle'
          }
        })
      }
    });
    canvas.add(line);
    // const point = line.getPoint(0.5);
    // expect(point.x).to.equal(100);
    // expect(point.y).to.equal(150);
  });
});

