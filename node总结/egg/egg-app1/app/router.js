module.exports = app => {
    const { router, controller } = app;
    router.get('/news', controller.news.index);
    router.get('/', controller.home.home);
}