import BabelInlineImportDataURI from '../plugin';
import * as babel from 'babel-core';

describe('Babel Inline Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the import statement into a variable with the intended content', () => {
      const transformedCode = babel.transform("import SomeExample from './fixtures/example.svg';", {
        filename: __filename,
        plugins: [[
          BabelInlineImportDataURI, {
            extensions: [
              '.svg'
            ]
          }
        ]]
      });

      expect(transformedCode.code).to.equal('/* babel-plugin-inline-import \'./fixtures/example.svg\' */var SomeExample = \'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjM0MXB4IiBoZWlnaHQ9Ijk2cHgiIHZpZXdCb3g9IjAgMCAzNDEgOTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+TG9nbzwvdGl0bGU+CiAgICA8ZyBpZD0iTG9nbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDQuMDAwMDAwKSI+CiAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZSIgc3Ryb2tlLXdpZHRoPSIxNCI+CiAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPSIjREU0RDVGIiBtYXNrPSJ1cmwoI21hc2stMikiIGZpbGw9IiMyODIwMjgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPSIjMjgyMDI4IiBtYXNrPSJ1cmwoI21hc2stMykiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\';');
    });

    it('accepts different extensions', () => {
      const transformedCode = babel.transform("import SomeExample from './fixtures/example.py';", {
        filename: __filename,
        plugins: [[
          BabelInlineImportDataURI, {
            extensions: [
              '.py'
            ]
          }
        ]]
      });

      expect(transformedCode.code).to.equal('/* babel-plugin-inline-import \'./fixtures/example.py\' */var SomeExample = \'data:application/octet-stream;base64,cHJpbnQgMSArIDEK\';');
    });

    it('throws error when importing with destructuring', () => {
      expect(() => {
        babel.transform("import { SomeExample, AnotherExample } from './fixtures/example.svg';", {
          filename: __filename,
          plugins: [BabelInlineImportDataURI]
        });
      }).to.throw(Error);
    });
  });
});
