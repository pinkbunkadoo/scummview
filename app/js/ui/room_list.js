const html = require('./html');
const Component = require('./component');
const ScrollPane = require('./scroll_pane');

class RoomList extends Component {
  constructor(params={}) {
    super(params);

    this.direction = 1;

    this.el = html.div().class('room-list-container').dom();
    this.itemsEl = html.div().class('room-list-items').dom();

    this.scrollPane = new ScrollPane();
    this.scrollPane.update({ component: this.itemsEl });

    this.el.appendChild(this.scrollPane.dom());
  }

  render() {
    if (this.model.items) {
      while (this.itemsEl.firstChild) this.itemsEl.removeChild(this.itemsEl.firstChild);

      for (var i = 0; i < this.model.items.length; i++) {
        let item = this.model.items[i];
        let el = this.renderListItem(item);
        this.itemsEl.append(el);
      }

    }
  }

  renderListItem(item) {
    let component = html.div()
      .dataset('id', item.id)
      .class('room-list-item')
      .append(
        html.div()
          .id('thumbnail' + item.id)
          .class('room-list-item-image')
          .append(item.image)
      )
      .append(
        html.div().class('room-list-item-text')
          .append(html.div().class('room-list-item-title').append(html.text(item.name || item.id)))
          .append(html.text(item.width + 'x' + item.height))
      )
      .on('click', (event) => {
        let id = event.target.dataset.id;
        if (!this.scrolled) {
          this.emit('select', id);
        }
        this.scrolled = false;
      })
    ;
    return component.dom();
  }

  update(model) {
    super.update(model);
    this.render();
    this.scrollPane.update();
  }


  reset() {
    this.scrollPane.reset();
  }

  clear() {
  }

  updateThumbnail(id, image) {
    let el = this.itemsEl.querySelector('#thumbnail' + id);
    el.removeChild(el.firstChild);
    el.appendChild(image);
  }

  startDrag() {
    // window.addEventListener('blur', this);
    // window.addEventListener('mouseup', this);
    // this.drag = true;
  }

  endDrag() {
    // if (this.drag) {
    //   window.removeEventListener('blur', this);
    //   window.removeEventListener('mouseup', this);
    //   this.drag = false;
    // }
    // if (this.down) {
    //   window.removeEventListener('mousemove', this);
    //   this.down = false;
    // }
  }

  onMouseDown(event) {
    // this.down = true;
    // this.scrolled = false;
    // this.mouseDownX = event.clientX;
    // this.mouseDownY = event.clientY;
    // window.addEventListener('mousemove', this);
  }

  onMouseUp(event) {
    this.endDrag();
  }

  onMouseMove(event) {
    // if ((!event.buttons & 1)) {
    //   this.drag = false;
    //   this.down = false;
    //   return;
    // }
    // if (this.down) {
    //   if (this.drag) {
    //     if (this.direction)
    //       this.listEl.scrollTop -= event.movementY;
    //     else
    //       this.listEl.scrollLeft -= event.movementX;
    //     this.scrolled = true;
    //   } else {
    //     let dx = event.clientX - this.mouseDownX;
    //     let dy = event.clientY - this.mouseDownY;
    //     if (event.buttons & 1 && Math.abs(this.direction?dy:dx) > 4) {
    //       if (this.direction) {
    //         this.listEl.scrollTop -= dy;
    //       } else {
    //         this.listEl.scrollLeft -= dx;
    //       }
    //       this.startDrag();
    //     }
    //   }
    // }
  }

  onWheel(event) {
    // if (this.direction)
    //   this.listEl.scrollTop += event.deltaY;
    // else
    //   this.listEl.scrollLeft += event.deltaX;
  }

  onBlur(event) {
    this.endDrag();
  }

  handleEvent(event) {
    if (event.type == 'mousedown') {
      this.onMouseDown(event);
    }
    else if (event.type == 'mouseup') {
      this.onMouseUp(event);
    }
    else if (event.type == 'mousemove') {
      this.onMouseMove(event);
    }
    else if (event.type == 'wheel') {
      this.onWheel(event);
    }
    else if (event.type == 'blur') {
      this.onBlur(event);
    }
  }
}

module.exports = RoomList;
