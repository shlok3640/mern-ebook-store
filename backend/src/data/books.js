const books = [
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    description: 'A classic book on software craftsmanship, exploring topics from personal responsibility and career development to architectural techniques.',
    price: 39.99,
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    category: 'Software Engineering',
    pages: 352,
    fileUrl: '/mock-pdfs/pragmatic-programmer.pdf'
  },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.',
    price: 42.50,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
    category: 'Software Engineering',
    pages: 464,
    fileUrl: '/mock-pdfs/clean-code.pdf'
  },
  {
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
    price: 54.00,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    category: 'Architecture',
    pages: 395,
    fileUrl: '/mock-pdfs/design-patterns.pdf'
  },
  {
    title: 'You Don\'t Know JS Yet: Get Started',
    author: 'Kyle Simpson',
    description: 'It seems like there\'s never enough time to really learn JavaScript. This series is designed to help you dive deeper into JavaScript.',
    price: 24.95,
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=400',
    category: 'JavaScript',
    pages: 140,
    fileUrl: '/mock-pdfs/ydkjs.pdf'
  }
];

module.exports = books;
