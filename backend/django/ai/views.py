from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

import datetime
from . import model

# Create your views here.


@csrf_exempt
def index(request):
    params = request.body.decode("utf-8").split("$")
    ubsf_str = "$".join(params[:-1])
    print(f"ubsf: {ubsf_str}")

    with open("debug_log.txt", "a") as debug_log:
        debug_log.write(f"[{datetime.datetime.now()}] {ubsf_str}")
        debug_log.write("\n")

    big_board, board_idx, ai_type = params[0].split("#"), int(params[1]), params[2]

    board_idx, cell_idx = model.determine_move(big_board, board_idx, ai_type)
    print(f"chosen move: ({board_idx}, {cell_idx})")

    return HttpResponse(f"{board_idx}${cell_idx}")
