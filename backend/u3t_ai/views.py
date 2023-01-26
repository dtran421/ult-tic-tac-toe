import os
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, HttpResponse

import datetime

from . import simulator
from . import model

# Create your views here.


@csrf_exempt
def index(request: HttpRequest):
    if request.method == "GET":
        return HttpResponse("ult-tic-tac-toe (U3T) ai")

    params = request.body.decode("utf-8").split("$")
    ubsf_str = "$".join(params[:-1])
    print(f"ubsf: {ubsf_str}")

    if os.environ.get("VERCEL_ENV") == "development":
        with open("u3t_ai/debug_log.txt", "a+") as debug_log:
            debug_log.write(f"[{datetime.datetime.now()}] {ubsf_str}")
            debug_log.write("\n")

    big_board, board_idx, ai_type = params[0].split("#"), int(params[1]), params[2]

    (board_idx, cell_idx), score = model.determine_move(big_board, board_idx, ai_type)
    print(f"chosen move: ({board_idx}, {cell_idx})")
    print(f"eval: {score}")

    return HttpResponse(f"{board_idx}${cell_idx}")


@csrf_exempt
def simulate(_):
    simulator.run_simulation()
    return HttpResponse("hello world!")
