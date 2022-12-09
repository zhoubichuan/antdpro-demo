import type { Request, Response } from 'express';

export default {
  'POST  /api/register': (_: Request, res: Response) => {
    res.send({
      data: { status: 'success', currentAuthority: 'user' },
    });
  },
};
