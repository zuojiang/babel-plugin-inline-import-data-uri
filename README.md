# Babel Inline Import Data URI

Babel plugin to add the opportunity to use `import` file content as DataURI.

## Examples

```jsx
import logo from './logo.svg';
import background from './background.png';

// Will print "data:image/svg+xml;base64,PD94bWwgdmVyc2lv...4KPC9zdmc+';"
console.log(logo);

class MyComponent extends React.Component
{
  render() {
    return (
      <div style={{background: `url(${background})`}}>
        <img src={logo}/>
      </div>;
    );
  }
}
```

## Install
```
npm install babel-plugin-inline-import-data-uri --save-dev
```

## Use
Add a `.babelrc` file and write:
```javascript
{
  "plugins": [
    "inline-import-data-uri"
  ]
}
```
or pass the plugin with the plugins-flag on CLI
```
babel-node myfile.js --plugins inline-import-data-uri
```

By default, Babel-Inline-Import is compatible with the following file extensions:

* `.svg`
* `.png`


## Customize
If you want to enable different file extensions, you can define them in your `.babelrc` file
```javascript
{
  "plugins": [
    ["inline-import-data-uri", {
      "extensions": [
        ".html",
        ".jpg"
      ]
    }]
  ]
}
```

## How it works

It inserts the __content__ of the _imported file_ directly into the _importing file_ encoded as [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs), assigning it to a variable with the same identifier of the _import statement_, thus replacing the _import statement_ and the _file path_ by its resulting content.

## Caveats

Babel does not track dependency between _imported_ and _importing_ files after the transformation is made. Therefore, you need to change the _importing file_ in order to see your changes in the _imported file_ spread. To overcome this:

* If you are using `babel-node` or `babel-register`, you can [disable babel cache (`BABEL_DISABLE_CACHE=1`)](https://babeljs.io/docs/usage/babel-register/#environment-variables-babel-disable-cache).
* If you are using webpack with `babel-loader`, you can use [babel-inline-import-loader](https://github.com/elliottsj/babel-inline-import-loader).

Also make sure that your task runner is watching for changes in the _imported file_ as well. You can see it working [here](https://github.com/Quadric/perfect-graphql-starter/blob/master/nodemon.json).


## Credits
This project is based on [babel-plugin-inline-import](https://github.com/Quadric/babel-plugin-inline-import).
