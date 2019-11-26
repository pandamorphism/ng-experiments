import {Directive, Input, OnInit, TemplateRef} from '@angular/core';

export type ColConfig = { field: string, header: string };

@Directive({
  selector: '[gridMetadata]',
})
export class GridMetadataDirective implements OnInit {
  @Input() gridMetadata: string;

  constructor(public template: TemplateRef<any>) {
  }

  ngOnInit(): void {
  }

}
