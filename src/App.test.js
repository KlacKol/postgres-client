describe('test client', () => {
  describe('login', () => {
    it('should return string email', function () {
      const isEmailOrName = (val) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return val.match(mailFormat) ? 'email' : 'name';
      };
      expect(isEmailOrName('qwe@qwe.qwe')).toEqual('email');
      expect(isEmailOrName('qwe.qwe')).toEqual('name');
      expect(isEmailOrName('qwe@qwe')).toEqual('name');
      expect(isEmailOrName('qwe')).toEqual('name');
      expect(isEmailOrName('ches@gmail.com')).toEqual('email')
    });
  })
})