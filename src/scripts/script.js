import module from './module';

const ES6Test = (...args) => {
  console.log(args.join(' '));
  document.getElementById('description').innerHTML = `With Boilerplate Gulp Sass Babel`;
}

ES6Test(`Hello`, `wordl`, `!`);
module();