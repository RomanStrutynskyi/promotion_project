import { Component, EventEmitter } from '@angular/core';
/**
 * Examples:
 * ComponentMock({ selector: 'cranium' });
 * ComponentMock({ selector: 'arm', inputs: ['side'] });
 */

export function ComponentMock(options: Component): Component {
  const metadata = { ...options };
  metadata.template = metadata.template || '';
  metadata.outputs = metadata.outputs || [];
  metadata.exportAs = metadata.exportAs || '';
  metadata.inputs = metadata.inputs || [];

  class Mock {}

  metadata.outputs.forEach((method) => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Component(metadata)(Mock as any);
}
