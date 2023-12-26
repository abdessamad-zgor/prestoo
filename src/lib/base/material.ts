enum SlideType {
  Quiz,
  BuilderSlide,
  PdfPage,
  PPTXPage
}

type SlideTree<T> = {
  type: SlideType,
  data: T
}

type Slide<T = any> = {
  slideNumber: number
  tree: SlideTree<T>
}


export class Material {
  slides: Slide[]
  constructor(slides: Slide[] = []) {
    this.slides = slides
  }
  slidesNum(){
    return this.slides.length
  }

  addSlide<T>(slide: Slide<T>){
    this.slides = [...this.slides, slide]
  }

  updateSlide(partialSlide: Partial<Slide>, index: number) {
    this.slides[index-1] = {...this.slides[index], ...partialSlide}
  }

  removeSlide(index: number) {
    this.slides = [...this.slides.filter((s,i)=>i!=index)]
  }
}
